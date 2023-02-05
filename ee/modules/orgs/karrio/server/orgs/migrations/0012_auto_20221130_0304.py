# Generated by Django 4.1.3 on 2022-11-30 03:04

from django.db import migrations
from django.conf import settings
import karrio.lib as lib


def forwards_func(apps, schema_editor):
    db_alias = schema_editor.connection.alias
    OrganizationUser = apps.get_model("orgs", "OrganizationUser")
    _users = []

    for user in OrganizationUser.objects.using(db_alias).all():
        roles = lib.to_dict(user.roles)

        if user.is_admin:
            roles = list(set([*roles, "admin"]))

        user.roles = roles
        _users.append(user)

    OrganizationUser.objects.using(db_alias).bulk_update(_users, ["roles"])


def reverse_func(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("orgs", "0011_documenttemplatelink_organization_document_templates"),
    ]
    operations = []

    if "postgres" in settings.DB_ENGINE:
        operations = [
            migrations.RunSQL('ALTER TABLE "orgs_organizationuser" ALTER COLUMN "roles" TYPE jsonb USING to_jsonb(roles)'),
        ]

    operations = [
        migrations.RunPython(forwards_func, reverse_func),
    ]
